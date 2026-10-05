import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // La ruta de reserva lleva un :medicoId dinamico -> se renderiza en el cliente,
  // no se puede prerenderizar sin conocer los ids de antemano.
  {
    path: 'reservar/:medicoId',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
