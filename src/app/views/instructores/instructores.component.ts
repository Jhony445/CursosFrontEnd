import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-instructores',
  templateUrl: './instructores.component.html',
  styleUrls: ['./instructores.component.css']
})
export class InstructoresComponent {
  // Data
  courses: any[] = [
    {
      id: 1,
      title: 'Desarrollo Web con Angular',
      description: 'Aprende a crear aplicaciones modernas con Angular y TypeScript.',
      modules: [
        {
          id: 101,
          title: 'Introducción a Angular',
          description: 'Conceptos básicos y fundamentos de Angular',
          evaluations: [
            { id: 1001, title: 'Quiz de Fundamentos', type: 'Quiz', questions: 10 },
            { id: 1002, title: 'Práctica de Componentes', type: 'Práctica', questions: 5 }
          ]
        },
        {
          id: 102,
          title: 'Componentes y Directivas',
          description: 'Creación y uso de componentes y directivas',
          evaluations: [
            { id: 1003, title: 'Examen Parcial 1', type: 'Examen', questions: 20 }
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Diseño UX/UI Avanzado',
      description: 'Técnicas avanzadas de diseño de experiencia de usuario.',
      modules: [
        {
          id: 201,
          title: 'Principios de UX',
          description: 'Fundamentos del diseño de experiencia de usuario',
          evaluations: [
            { id: 2001, title: 'Quiz de Principios', type: 'Quiz', questions: 15 }
          ]
        }
      ]
    }
  ];

  // Forms
  courseForm: FormGroup;
  moduleForm: FormGroup;
  evaluationForm: FormGroup;

  // Modal states
  showCourseModal = false;
  showModuleModal = false;
  showEvaluationModal = false;

  // Editing states
  editingCourse: any = null;
  editingModule: any = null;
  editingEvaluation: any = null;
  selectedCourseForModule: any = null;

  constructor(private fb: FormBuilder) {
    // Initialize forms
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });

    this.moduleForm = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });

    this.evaluationForm = this.fb.group({
      title: ['', Validators.required],
      type: ['Quiz', Validators.required],
      questions: [5, [Validators.required, Validators.min(1)]]
    });
  }

  // Calculate total evaluations in a course
  getTotalEvaluations(course: any): number {
    return course.modules.reduce((total: number, module: any) => total + module.evaluations.length, 0);
  }

  // Course modal functions
  openCourseModal(course: any = null) {
    this.editingCourse = course;
    if (course) {
      this.courseForm.patchValue({
        title: course.title,
        description: course.description
      });
    } else {
      this.courseForm.reset();
    }
    this.showCourseModal = true;
  }

  closeCourseModal() {
    this.showCourseModal = false;
    this.editingCourse = null;
  }

  saveCourse() {
    if (this.courseForm.valid) {
      const courseData = this.courseForm.value;
      
      if (this.editingCourse) {
        // Update existing course
        Object.assign(this.editingCourse, courseData);
      } else {
        // Add new course
        const newCourse = {
          id: this.courses.length + 1,
          ...courseData,
          modules: []
        };
        this.courses.push(newCourse);
      }
      
      this.closeCourseModal();
    }
  }

  editCourse(course: any) {
    this.openCourseModal(course);
  }

  deleteCourse(course: any) {
    if (confirm(`¿Estás seguro de que quieres eliminar el curso "${course.title}"?`)) {
      const index = this.courses.indexOf(course);
      if (index !== -1) {
        this.courses.splice(index, 1);
      }
    }
  }

  // Module modal functions
  openModuleModal(module: any = null, course: any = null) {
    this.editingModule = module;
    this.selectedCourseForModule = course;
    
    if (module) {
      this.moduleForm.patchValue({
        title: module.title,
        description: module.description
      });
    } else {
      this.moduleForm.reset();
    }
    this.showModuleModal = true;
  }

  closeModuleModal() {
    this.showModuleModal = false;
    this.editingModule = null;
    this.selectedCourseForModule = null;
  }

  saveModule() {
    if (this.moduleForm.valid && this.selectedCourseForModule) {
      const moduleData = this.moduleForm.value;
      
      if (this.editingModule) {
        // Update existing module
        Object.assign(this.editingModule, moduleData);
      } else {
        // Add new module
        const newModule = {
          id: Date.now(), // Generate unique ID
          ...moduleData,
          evaluations: []
        };
        this.selectedCourseForModule.modules.push(newModule);
      }
      
      this.closeModuleModal();
    }
  }

  addModule(course: any) {
    this.openModuleModal(null, course);
  }

  editModule(module: any) {
    // Find the course that contains this module
    const course = this.courses.find(c => c.modules.includes(module));
    if (course) {
      this.openModuleModal(module, course);
    }
  }

  deleteModule(module: any) {
    if (confirm(`¿Estás seguro de que quieres eliminar el módulo "${module.title}"?`)) {
      // Find the course that contains this module
      const course = this.courses.find(c => c.modules.includes(module));
      if (course) {
        const index = course.modules.indexOf(module);
        if (index !== -1) {
          course.modules.splice(index, 1);
        }
      }
    }
  }

  // Evaluation modal functions
  openEvaluationModal(evaluation: any = null, module: any = null) {
    this.editingEvaluation = evaluation;
    
    if (evaluation) {
      this.evaluationForm.patchValue({
        title: evaluation.title,
        type: evaluation.type,
        questions: evaluation.questions
      });
    } else {
      this.evaluationForm.reset({
        type: 'Quiz',
        questions: 5
      });
    }
    
    if (module) {
      this.selectedCourseForModule = module;
    }
    
    this.showEvaluationModal = true;
  }

  closeEvaluationModal() {
    this.showEvaluationModal = false;
    this.editingEvaluation = null;
    this.selectedCourseForModule = null;
  }

  saveEvaluation() {
    if (this.evaluationForm.valid && this.selectedCourseForModule) {
      const evaluationData = this.evaluationForm.value;
      
      if (this.editingEvaluation) {
        Object.assign(this.editingEvaluation, evaluationData);
      } else {
        const newEvaluation = {
          id: Date.now(),
          ...evaluationData
        };
        this.selectedCourseForModule.evaluations.push(newEvaluation);
      }
      
      this.closeEvaluationModal();
    }
  }

  addEvaluation(module: any) {
    this.openEvaluationModal(null, module);
  }

  editEvaluation(evaluation: any) {
    for (const course of this.courses) {
      for (const module of course.modules) {
        if (module.evaluations.includes(evaluation)) {
          this.openEvaluationModal(evaluation, module);
          return;
        }
      }
    }
  }

  deleteEvaluation(evaluation: any) {
    if (confirm(`¿Estás seguro de que quieres eliminar la evaluación "${evaluation.title}"?`)) {
      for (const course of this.courses) {
        for (const module of course.modules) {
          const index = module.evaluations.indexOf(evaluation);
          if (index !== -1) {
            module.evaluations.splice(index, 1);
            return;
          }
        }
      }
    }
  }
}