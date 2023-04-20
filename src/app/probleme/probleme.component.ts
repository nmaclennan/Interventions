import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/longeur-minimum/longeur-minimum.components';
import { TypeproblemeService } from './typeprobleme.service';
import { ITypeProbleme } from './typeprobleme';
import { emailMatcherValidator } from '../shared/email-matcher.component';

@Component({
  selector: 'app-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css'],
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  typesProbleme: ITypeProbleme[];
  errorMessage: string;
  constructor(
    private fb: FormBuilder,
    private typeproblemeService: TypeproblemeService
  ) {}
  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenom: [
        '',
        [VerifierCaracteresValidator.longueurMinimum(3), Validators.required],
      ],
      nom: ['', [Validators.maxLength(50), Validators.required]],
      typeProbleme: ['', [Validators.required]],
      noTypeProbleme: ['', Validators.required],
      courrielGroup: this.fb.group({
        courriel: [{ value: '', disabled: true }],
        courrielConfirmation: [{ value: '', disabled: true }],
      }),
      telephone: [{ value: '', disabled: true }],
    });
    this.typeproblemeService.obtenirTypesProbleme().subscribe(
      (typesProbleme) => (this.typesProbleme = typesProbleme),
      (error) => (this.errorMessage = <any>error)
    );
  }
  save(): void {}

  appliquerNotifications(etat: string): void {
    const courrielGroupControl = this.problemeForm.get('courrielGroup');
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');
    const telephoneControl = this.problemeForm.get('telephone');           
    courrielControl.clearValidators();
    courrielControl.reset(); 
    courrielControl.disable();
    
    courrielConfirmationControl.clearValidators();
    courrielConfirmationControl.reset();
    courrielConfirmationControl.disable();

    telephoneControl.clearValidators();
    telephoneControl.reset();
    telephoneControl.disable();

    if (etat === 'telephone') {
       telephoneControl.setValidators([
         Validators.required,
         Validators.minLength(10),
         Validators.maxLength(10),
         Validators.pattern('[0-9]+'),
       ]);
       telephoneControl.enable();  
    }
    else
    {
      if (etat === 'courriel') {
        courrielGroupControl.setValidators([
        Validators.compose([emailMatcherValidator.courrielDifferents()]),
        ]);
        courrielControl.setValidators([
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+'),
        ]);
        courrielConfirmationControl.setValidators([
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+'),
        ]);
        courrielControl.enable();
        courrielConfirmationControl.enable(); 
      }
    }
    telephoneControl.updateValueAndValidity();
    courrielControl.updateValueAndValidity();
    courrielConfirmationControl.updateValueAndValidity();
  }
  
}
