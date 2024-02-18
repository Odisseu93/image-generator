import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


type BodyRequestType = {
 imageDescription: string
}

@Injectable({
  providedIn: 'root',
})
export class ImageGeneratorService {
  constructor(private httpClient: HttpClient) {}

  generate(body: BodyRequestType) {
    return this.httpClient.post(
      'https://openai-api-rho.vercel.app/generate/image',
      body,
    );
  }
}
