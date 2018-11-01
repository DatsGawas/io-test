/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author - Pratik Kelwalkar
 *
 */
/*
 Component Name : Amexio video player
 Component Selector : <amexio-video-player>
 Component Description : Video player component support all types of videos.
*/
import {Component, Input, OnInit, ViewChild} from '@angular/core';
@Component({
  selector: 'amexio-video-player',
  templateUrl: './video.player.component.html',
  styleUrls: ['./video.player.component.scss'],
})
export class AmexioVideoPlayerComponent implements OnInit {
/*
Properties
name : path
datatype :  any
version : 4.0 onwards
default :
description : Path of video
*/
  @Input() path: any;
/*
Properties
name : extension
datatype :  any
version : 4.0 onwards
default :
description : Video extension
*/
  @Input() extension: any;
/*
Properties
name : width
datatype :  any
version : 4.0 onwards
default :
description :  Width of the video player window
*/
  @Input() width: any;

  @ViewChild('videoRef') videoPlayer: any;

  @ViewChild('progressbar') progressBar: any;

  @ViewChild('volumebar') volumebar: any;

  isPlaying: boolean;

  isMuted: boolean;

  currentVolume = 1;

  constructor() {
  }

  ngOnInit() {
  }

  onVolumeChange(event: any) {
    this.videoPlayer.nativeElement.volume = this.currentVolume = event.target.value;
  }

  updateMuteUI() {
    if (this.videoPlayer.nativeElement.muted) {
      this.isMuted = true;
    } else {
      this.isMuted = false;
   }
   }
onPlay() {
    if (!this.isPlaying) {
      this.videoPlayer.nativeElement.play();
      this.isPlaying = true;
    } else {
      this.videoPlayer.nativeElement.pause();
      this.isPlaying = false;
    }
  }

  onTimeUpdate() {
    const percentage = Math.floor((100 / this.videoPlayer.nativeElement.duration) * this.videoPlayer.nativeElement.currentTime);
    this.progressBar.nativeElement.value = percentage;
    // Update the progress bar's text (for browsers that don't support the progress element)
    this.progressBar.nativeElement.innerHTML = percentage + '% played';
    if (percentage === 100) {
      this.isPlaying = false;
    }
  }

  replayVideo() {
    this.resetPlayer();
    this.onPlay();
  }

  resetPlayer() {
    this.videoPlayer.nativeElement.pause();
    this.progressBar.nativeElement.value = 0;
    this.videoPlayer.nativeElement.currentTime = 0;
    this.isPlaying = false;
  }

  onFullScreen() {
    const elem = this.videoPlayer.nativeElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  }

  onMute() {
    if (!this.isMuted) {
      this.videoPlayer.nativeElement.muted = true;
      this.isMuted = true;
      this.volumebar.nativeElement.value = 0;
    } else {
      this.videoPlayer.nativeElement.muted = false;
      this.isMuted = false;
      this.volumebar.nativeElement.value = this.currentVolume;
    }
  }

}
