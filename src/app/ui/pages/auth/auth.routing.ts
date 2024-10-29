import { authGuard } from "@/core/guards/auth.guard";
import { leaveFormGuard } from "@/core/guards/leave-form.guard";
import { LoginComponent } from "@/ui/components/login/login.component";
import { SignupComponent } from "@/ui/components/signup/signup.component";
import { Routes } from "@angular/router";

export const authRoutes: Routes = [
    {
        path: 'signin',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent,
        canDeactivate: [
            leaveFormGuard
        ]
    },
    {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full'
    }
];