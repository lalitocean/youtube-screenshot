// ==UserScript==
// @name         YouTube Screenshot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add a button to capture a screenshot from a YouTube video with sequential filenames (screenshot_1.png, screenshot_2.png, etc.)
// @author       Lalit Ocean
// @match       https://www.youtube.com/watch?v=*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let screenshotCount = 1;
    //  capture screenshot
    function captureScreenshot() {
        const video = document.querySelector('.video-stream.html5-main-video');
        if (!video) {
            alert('No video found!');
            return;
        }

        const width = video.videoWidth;
        const height = video.videoHeight;

        // Create a canvas element to draw the current video frame
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, width, height);

        const imageDataURL = canvas.toDataURL('image/png'); 

        // Create a link to download the image with a sequential filename
        const link = document.createElement('a');
        link.href = imageDataURL;

        // Create the filename with sequential number
        const filename = `screenshot_${screenshotCount}.png`;
        link.download = filename; // Set the filename
        link.click();

        // Increment the screenshot count for the next screenshot
        screenshotCount++;
    }

    // Function to add the screenshot button to the page
    function addButton() {
        // Create the screenshot button
        const button = document.createElement('button');
        button.textContent = 'screenshot';
        button.style.zIndex = '1000';
        button.style.border = 'none';
        button.style.padding='10px 10px';
        button.style.backgroundColor = '#30336b';
        button.style.color = '#25CCF7';
        button.style.cursor = 'pointer';
        button.style.position = 'absolute';
        button.style.top = '50%';
        button.style.transform = 'translateY(-50%)';
        button.style.left = '50%';
        button.style.transform += ' translateX(-50%)';


        // Add an event listener for the button click
        button.addEventListener('click', captureScreenshot);

        const parent=document.querySelector('.ytp-right-controls');
       
        if (parent) {
        parent.appendChild(button);

        } else {
            console.error('Parent element not found.');
        }
    }

    window.onload = function() {
    addButton();
    };
})();

