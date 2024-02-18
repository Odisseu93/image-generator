import { Component, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ImageGeneratorService } from './shared/services/image-generator.service';
import { MatProgressSpinnerModule  } from '@angular/material/progress-spinner'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  title = 'Gerador de images';
  form: FormGroup;
  totalChar = 0;
  isLoading = false;

  @Output() generatedImageSrc: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private imageGeneratorService: ImageGeneratorService,
  ) {
    this.form = this.formBuilder.group({ imageDescription: '' });
  }

  countChar(): void {
    this.totalChar = this.form.value.imageDescription.length || 0;
  }

  handleSubmit(): void {
    this.isLoading = true;
    this.imageGeneratorService
      .generate({ imageDescription: this.form.value.imageDescription })
      .subscribe({
        next: (res: any) => {
          this.generatedImageSrc = res[0].url;
          this.isLoading = false;
        },
        error: (err: any) => {
          console.error(err);
          this.isLoading = false;
        },
      });
  }
}
