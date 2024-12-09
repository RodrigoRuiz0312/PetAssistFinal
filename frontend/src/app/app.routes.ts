import { Routes } from '@angular/router';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { InicioClienteComponent } from './components/inicio-cliente/inicio-cliente.component';
import { CartillaComponent } from './components/cartilla/cartilla.component';
import { RegistroMascotaComponent } from './components/registro-mascota/registro-mascota.component';
import { RegistroCitaComponent } from './components/registro-cita/registro-cita.component';
import { InicioVetComponent } from './components/inicio-vet/inicio-vet.component';
import { TablaCitasVetComponent } from './components/tabla-citas-vet/tabla-citas-vet.component';
import { PerfilVetComponent } from './components/perfil-vet/perfil-vet.component';
import { EditarVetComponent } from './components/editar-vet/editar-vet.component';
import { authGuard } from './guards/auth.guard';
import { VeterinariosComponent } from './components/veterinarios/veterinarios.component';
import { InicioComponent } from './components/inicio/inicio.component';


export const routes: Routes = [

    {
        path:"",
        component:InicioComponent
    },
    {
        path:"login",
        component:LoginComponent
    },
    {
        path:"registro",
        component:RegistroComponent
    },
    {
        path:"about",
        component:AboutComponent
    },
    {
        path:"inicio-cliente",
        component:InicioClienteComponent,
        canActivate: [authGuard]
    },
    {
        path:"listaVets",
        component:VeterinariosComponent,
        canActivate: [authGuard]
    },
    {
        path:"registroCita",
        component:RegistroCitaComponent,
        canActivate: [authGuard]
    },
    {
        path:"cartilla",
        component:CartillaComponent,
        canActivate: [authGuard]
    },
    {
        path:"registroMascota",
        component:RegistroMascotaComponent,
        canActivate: [authGuard]
    },
    {
        path:"inicioVet",
        component: InicioVetComponent,
        canActivate: [authGuard]
    },
    {
        path:"tablaVet",
        component: TablaCitasVetComponent,
        canActivate: [authGuard]
    },
    {
        path:"perfilVet",
        component: PerfilVetComponent,
        canActivate: [authGuard]
    },
    {
        path:"editarVet",
        component: EditarVetComponent,
        canActivate: [authGuard]
    }
];