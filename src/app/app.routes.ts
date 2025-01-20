import { Routes } from '@angular/router';
import { VideoListComponent } from './components/video-list/video-list.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { PlaylistComponent } from './components/playlist/playlist.component';

export const routes: Routes = [
  { path: '', component: VideoListComponent },
  { path: 'video/:id', component: VideoPlayerComponent },
  { path: 'playlist', component: PlaylistComponent },
  // Wildcard route for 404
  { path: '**', redirectTo: '' }
];