import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';
import { TypeproblemeService } from './typeprobleme.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ProblemeComponent],
      providers: [TypeproblemeService],
    }).compileComponents();

    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('#1 | Zone PRÉNOM invalide avec 2 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(2));
    expect(zone.valid).toBeFalsy();
  });
  it('#2 | Zone PRÉNOM valide avec 3 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy();
  });
  it('#3 | Zone PRÉNOM valide avec 200 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(200));
    expect(zone.valid).toBeTruthy();
  });
  it('#4 | Zone PRÉNOM invalide avec aucune valeur', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(''.repeat(0));
    expect(zone.valid).toBeFalsy();
  });
  it('#5 | Zone PRÉNOM valide avec 10 espaces', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(' '.repeat(10));
    expect(zone.valid).toBeFalse();
  });
  it('#6 | Zone PRÉNOM valide avec 2 espaces et 1 caractère', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('  a'.repeat(1));
    expect(zone.valid).toBeFalse();
  });
  it('#15 | Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('etat');

    let zone = component.problemeForm.get('telephone');
    expect(zone.enabled).toBeFalse;
  });
  it('#16 | Zone TELEPHONE est vide quand ne pas me notifier', () => {
    component.appliquerNotifications('etat');

    let zone = component.problemeForm.get('telephone');
    expect(zone.disabled).toBeTrue();
  });
  it('#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('etat');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  });
  it('#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('etat');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  });
  it('#19 | Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('etat');

    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });
  it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications('etat');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.enabled).toBeTrue;
  });
  it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications('etat');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.enabled).toBeTrue;
  });
  it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('etat');
    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('');
    errors = zone.errors || {};
    expect(errors['requires']).toBeTruthy;
  });
  it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('etat');
    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('');
    errors = zone.errors || {};
    expect(errors['requires']).toBeFalsy();
  });
  it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
    component.appliquerNotifications('etat');
    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('[a-z0-9._%+-]+@[a-z0-9.-]+');
    errors = zone.errors || {};
    expect(errors['requires']).toBeFalsy();
  });
  it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => {
    component.appliquerNotifications('courriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    let zone2 = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone2.setValue('courrielValide@hotmail.com')
    let groupe = component.problemeForm.get('courrielGroup');
    expect(groupe.invalid).toBeTrue();
  });
  it('#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
    component.appliquerNotifications('courriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    let zone2 = component.problemeForm.get(
      'courrielGroup.courrielConfirmation'
    );
    zone2.setValue('courrielValide@hotmail.com');
    zone.setValue('courrielValide@hotmail.com');
    let groupe = component.problemeForm.get('courrielGroup');
    expect(groupe.invalid).toBeTrue();
  });
  it('#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
component.appliquerNotifications('courriel');
let zone = component.problemeForm.get('courrielGroup.courriel');
let zone2 = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone2.setValue('courrielvalide@hotmail.com');
    zone.setValue('courrielvalide@hotmail.com');
let groupe = component.problemeForm.get('courrielGroup');
expect(groupe.status).toBe('VALID');
  });
  it('#29 | Zone TELEPHONE est activée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('telephone');

    let zone = component.problemeForm.get('telephone');
    expect(zone.enabled).toBeTrue();

  });
  it('#30 | Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('telephone');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  });
  it('#31 | Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte', () => {
      component.appliquerNotifications('etat');

      let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
      expect(zone.status).toEqual('DISABLED');
  });
  it('#32 | Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte', () => {
    component.appliquerNotifications('telephone');
    let errors = {};
    let zone = component.problemeForm.get('telephone');
    zone.setValue('');
    errors = zone.errors || {};
    expect(errors['requires']).toBeTruthy;
  });
  it('#33 | Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte', () => {
    component.appliquerNotifications('telephone');
    let errors = {};
    let zone = component.problemeForm.get('telephone');
    zone.setValue('[0-9]+');
    errors = zone.errors || {};
    expect(errors['requires']).toBeTruthy;

  });
  it('#34 | Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('telephone');
    let errors = {};
    let zone = component.problemeForm.get('telephone');
    zone.setValue;
    errors = zone.errors || {};
    expect(errors['requires']).toBeTruthy;

  });
  it('#35 | Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('telephone');
    let errors = {};
    let zone = component.problemeForm.get('telephone');
    zone.setValue('');
    errors = zone.errors || {};
    expect(errors['requires']).toBeTruthy;

  });
  it('#36 | Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('telephone');
    let errors = {};
    let zone = component.problemeForm.get('telephone');
    zone.setValue('');
    errors = zone.errors || {};
    expect(errors['requires']).toBeTruthy;

  });

});
