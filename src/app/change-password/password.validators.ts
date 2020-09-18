import { ContactFormComponent } from './../contact-form/contact-form.component';
import { AbstractControl } from '@angular/forms';


export class PasswordValidators {
    static validOldPassword(control: AbstractControl) {
        return new Promise((resolve) => {
            if (control.value !== '1234') {
                resolve({ invalidOldPassword: true });
            }
            else {
                resolve(null);
            }
        });
    }

    static passwordsShouldMatch(control: AbstractControl) {
        const newPassword = control.get('newPassword');
        const confirmPassword = control.get('confirmPassword');

        if (newPassword.value !== confirmPassword.value) {
            return { passwordsShouldMatch: true };
        }

        return null;
    }
}
