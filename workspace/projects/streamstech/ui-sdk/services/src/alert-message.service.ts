import {Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConstantService } from '@streamstech/ui-sdk/constants';
import {AlertMessageComponent} from '@streamstech/ui-sdk/fuse/alert'

@Injectable({
    providedIn: 'root',
})
export class AlertMessageService {

    constructor(private _snackBar: MatSnackBar) { }

    showSuccess() {
        this._snackBar.openFromComponent(AlertMessageComponent, {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                type: 'success',
                messageTitle: 'Success',
                messageBody: 'The Operation is successful',
            },
        });
    }

    showError() {
        this._snackBar.openFromComponent(AlertMessageComponent, {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                type: 'error',
                messageTitle: ConstantService.Message.SAVED_FAIL_TITLE,
                messageBody: ConstantService.Message.SAVED_FAIL,
            },
        });
    }
    showGivenSuccessMessage(msg: string) {
        this._snackBar.openFromComponent(AlertMessageComponent, {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                type: 'success',
                messageTitle: ConstantService.Message.SUCCESSFUL_TITLE,
                messageBody: msg,
            },
        });
    }
    showSuccessMessage() {
        this._snackBar.openFromComponent(AlertMessageComponent, {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                type: 'success',
                messageTitle: ConstantService.Message.SUCCESSFUL_TITLE,
                messageBody: ConstantService.Message.SAVED_SUCCESSFUL,
            },
        });
    }

    showCancelMessage() {
        this._snackBar.openFromComponent(AlertMessageComponent, {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                type: 'success',
                messageTitle: ConstantService.Message.SUCCESSFUL_TITLE,
                messageBody: ConstantService.Message.CANCEL_SUCCESSFUL,
            },
        });
    }
    showDeleteMessage() {
        this._snackBar.openFromComponent(AlertMessageComponent, {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                type: 'success',
                messageTitle: ConstantService.Message.SUCCESSFUL_TITLE,
                messageBody: ConstantService.Message.DELETE_SUCCESSFUL,
            },
        });
    }

    successMessage(message: string) {
        this._snackBar.openFromComponent(AlertMessageComponent, {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                type: 'success',
                messageTitle: 'Success',
                messageBody: message,
            },
        });
    }
    showErrorNotification() {
        this._snackBar.openFromComponent(AlertMessageComponent, {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                type: 'error',
                messageTitle: 'Error',
                messageBody:
                    'The operation has failed due to the presence of child entities associated with this office type.',
            },
        });
    }

    showWarning() {
        this._snackBar.openFromComponent(AlertMessageComponent, {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                type: 'warn',
                messageTitle: 'Warning',
                messageBody: 'The Operation is successful',
            },
        });
    }
    showInfo() {
        this._snackBar.openFromComponent(AlertMessageComponent, {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                type: 'info',
                messageTitle: 'Information',
                messageBody: 'The Operation is successful',
            },
        });
    }

    showErrorMessage(message: string) {
        this._snackBar.openFromComponent(AlertMessageComponent, {
            duration: 4 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                type: 'error',
                messageTitle: 'Error',
                messageBody: message,
            },
        });
    }

    showWarningMessage(message: string) {
        this._snackBar.openFromComponent(AlertMessageComponent, {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                type: 'warn',
                messageTitle: 'Warning',
                messageBody: message,
            },
        });
    }
}
