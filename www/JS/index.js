/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

 onDeviceReady: function() {

        app.receivedEvent('deviceready');

        app.updateMedia("http://fg.impek.tv:80");

    },

    updateMedia: function(radioUrl) {

    	if(myMedia != null) {

    		myMedia.release();

    	}

       	document.getElementById('audio_title').innerHTML = radioUrl;

    	myMedia = new Media(radioUrl,

    				function() { // success callback

    					console.log("Media instance success.");

    				},

    				function() { // error callback

    					console.log("Media error");

    				},

    				function(status) {

    					///console.log("status: "+status);

    					mediaState = status;

    					if(status == Media.MEDIA_NONE) {

    						console.log("MEDIA_NONE");

    					} else if(status == Media.MEDIA_STARTING) {

    						console.log("MEDIA_STARTING");

    				       	document.getElementById('audio_position').innerHTML = 'buffering';

    						$('#play .ui-btn-text').text("P A U S E");

    					} else if(status == Media.MEDIA_RUNNING) {

    						console.log("MEDIA_RUNNING");

    						$('#play .ui-btn-text').text("P A U S E");

    					} else if(status == Media.MEDIA_PAUSED) {

    						console.log("MEDIA_PAUSED");

    						$('#play .ui-btn-text').text("STREAM");

    					} else if(status == Media.MEDIA_STOPPED) {

    						console.log("MEDIA_STOPPED");

    				       	document.getElementById('audio_position').innerHTML = '<3';

    						$('#play .ui-btn-text').text("STREAM");

    					} else {

    						console.log("MEDIA_UNKNOWN");

    					}

    				});

    },

    playAudio: function() {

    	if(mediaState != Media.MEDIA_STARTING && mediaState != Media.MEDIA_RUNNING) {

    		myMedia.play();

    		// Update myMedia position every second

            if (mediaTimer == null) {

                mediaTimer = setInterval(function() {

                    // get myMedia position

                    myMedia.getCurrentPosition(

                        // success callback

                        function(position) {

                            if (mediaState == 2 && position > -1) {

                            	document.getElementById('audio_position').innerHTML = position + '/' + myMedia.getDuration() + ' secs.';

                            }

                        },

                        // error callback

                        function(e) {

                            console.log("Error getting pos=" + e);

                        	document.getElementById('audio_position').innerHTML = "Error: " + e;

                        }

                    );

                }, 1000);

            }

    	} else {

    		myMedia.pause();

    	}

    },

    stopAudio: function() {

    	myMedia.stop();

    	clearInterval(mediaTimer);

    	mediaTimer = null;

    },