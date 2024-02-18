import { Component, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ImageGeneratorService } from './shared/services/image-generator.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { ToastrService } from 'ngx-toastr'

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
    private toasty: ToastrService,
  ) {
    this.form = this.formBuilder.group({ imageDescription: '' });
  }

  countChar(): void {
    this.totalChar = this.form.value.imageDescription.length || 0;
  }

  handleSubmit() {
    if (!!!this.form.value.imageDescription) this.toasty.info("oops! Parece que você esqueceu de enviar a descrição da imagem!");
    else {
      this.isLoading = true;
      this.imageGeneratorService
        .generate({ imageDescription: this.form.value.imageDescription })
        .subscribe({
          next: (res: any) => {
            this.generatedImageSrc = res[0].url;
            this.isLoading = false;
            this.toasty.success("uhuu! Imagem gerada com sucesso! ✅️🏁️🏁️");
          },
          error: (err: any) => {
            this.toasty.error("Que estranho! Parece que alguma coisa deu errado 🤔️, tente mais tarde!");
            console.error(err);
            this.isLoading = false;
          },
        });
    }
  }
}
