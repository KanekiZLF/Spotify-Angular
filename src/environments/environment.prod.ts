// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: true
};

export const SpotifyConfiguration = {
    clientId: 'ad0ff74dc6704944a4882bd16b4cb495', //ID Do cliente
    authEndpoint: 'https://accounts.spotify.com/authorize', // Solicita autorização de login
    redirectUrl: 'http://localhost:4200/login/', //Url de redirecionamento
    scopes: [
        "user-read-currently-playing", // musica tocando agora.
        "user-read-recently-played", // ler musicas tocadas recentemente
        "user-read-playback-state", // ler estado do player do usuario
        "user-top-read", // top artistas e musicas do usuario
        "user-modify-playback-state", // alterar do player do usuario.
        "user-library-read", // ler biblioteca dos usuarios
        "playlist-read-private", // ler playlists privads
        "playlist-read-collaborative" // ler playlists colaborativas
    ]
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
  // import 'zone.js/plugins/zone-error';  // Included with Angular CLI.