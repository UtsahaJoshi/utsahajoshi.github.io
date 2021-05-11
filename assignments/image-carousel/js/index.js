function ImageCarousel(){

    this.createCarousel = function(element, width, animationTime){
        //set widths to container and wrapper
        this.element = element;
        this.element.style.visibility = "visible";
        this.width = width;
        this.animationTime = animationTime;
        this.imageWrapper = element.children[0];
        this.totalImages = this.imageWrapper.children.length;
        this.element.style.width = this.width +"px";
        this.imageWrapper.style.width = this.width * this.totalImages +"px";
        this.element.style.textAlign = "center";
        this.currentImageIndex = 1;
        var self = this;
        

        //create previous and next buttons
        var previousArrow = document.createElement('a');
        var linkText = document.createTextNode("<");
        previousArrow.appendChild(linkText);
        previousArrow.title = "Previous";
        previousArrow.style.position = "absolute";
        previousArrow.style.top = this.imageWrapper.clientHeight / 2.5 +"px";
        previousArrow.style.left = "20px";
        previousArrow.style.color = "#ffffff";
        previousArrow.style.fontSize = this.imageWrapper.clientHeight/10 +"px";
        previousArrow.style.fontFamily = "cursive";
        previousArrow.style.cursor = "pointer";
        previousArrow.onclick = function() {
            changeSlide(-1, self);
        }
        this.element.appendChild(previousArrow);

        var nextArrow = document.createElement('a');
        linkText = document.createTextNode(">");
        nextArrow.appendChild(linkText);
        nextArrow.title = "Next";
        nextArrow.style.position = "absolute";
        nextArrow.style.top = this.imageWrapper.clientHeight / 2.5 +"px";
        nextArrow.style.right = "20px";
        nextArrow.style.color = "#ffffff";
        nextArrow.style.fontSize = this.imageWrapper.clientHeight/10 +"px";
        nextArrow.style.fontFamily = "cursive";
        nextArrow.style.cursor = "pointer";
        nextArrow.onclick = function() {
            changeSlide(1, self);
        }
        this.element.appendChild(nextArrow);

        //create slider bottom dots
        var sliderDotsContainer = document.createElement('div');
        sliderDotsContainer.style.position = "absolute";
        sliderDotsContainer.style.bottom = "20px";
        sliderDotsContainer.style.left = this.width / 2 - this.totalImages * 25 / 2 + "px";
        this.element.appendChild(sliderDotsContainer);
        var dots = [];

        for (var i = 0; i < this.totalImages; i++){
            let dot = document.createElement('span');
            dot.id = "slider-dot" + i;
            dot.style.cursor= "pointer";
            dot.style.height = "15px";
            dot.style.width = "15px";
            dot.style.margin = "0 5px";
            dot.style.backgroundColor = "#bbbbbb";
            dot.style.borderRadius = "50%";
            dot.style.display = "inline-block";
            dot.style.transition = "background-color 0.6s ease";
            if (i === this.currentImageIndex) {
                dot.className = "slider-dot-selected";
            }
            dot.onmouseover = function() 
            {
                this.style.backgroundColor = "#717171";
            }
            dot.onmouseleave = function() 
            {
                if (!dot.classList.contains("slider-dot-selected")) {
                    this.style.backgroundColor = "#bbbbbb";
                }
            }
            dot.onclick = selectSliderDot(dots, dot);
            dots.push(dot);
            sliderDotsContainer.appendChild(dot);
        }
    }

    //private functions

    //select slider dots
    var selectSliderDot = function(dots, selectedDot){
        for (dot in dots) {
            if (dots[dot].classList.contains("slider-dot-selected")){
                dots[dot].classList.remove("slider-dot-selected");
                dots[dot].style.backgroundColor = "#bbbbbb";
            }
        }
        selectedDot.className = "slider-dot-selected";
    }

    //change the slide
    var changeSlide = function(direction, self){
        var moveLength = 10;
        var incrementMoveLength = 10;
        var totalIntervals = self.width/ 10;
        var intervalTime = self.animationTime / totalIntervals;
        var widthPerSlide = self.imageWrapper.clientWidth - self.width;
        var direction = direction;
        var currentPosition = (self.currentImageIndex - 1) * self.width;
        console.log(currentPosition);
        if (direction === 1 && self.currentImageIndex === self.totalImages) {
            self.currentImageIndex = 1;
            intervalTime = 10;
            moveLength = 100;
            incrementMoveLength = 100;
            direction = -1;
        } 
        else if (direction === -1 && self.currentImageIndex === 1) {
            self.currentImageIndex = self.totalImages;
            intervalTime = 10;
            moveLength = 100;
            incrementMoveLength = 100;
            direction = 1;
        } else {
            self.currentImageIndex += direction;
            widthPerSlide = self.width;
        }
        var timer = setInterval(function() {

            self.imageWrapper.style.transform = "translate("+ (-currentPosition + (-direction * moveLength)) +"px, 0px)";
            console.log(currentPosition)
            moveLength += incrementMoveLength;
            console.log(moveLength, widthPerSlide)
            if (moveLength > widthPerSlide) {
                clearInterval(timer);
                return;
            }
        }, intervalTime)
    }
}

window.addEventListener("load", () => {
    var carouselContainers = document.getElementsByClassName("carousel-container");
    var imageCarouselArray = [];
    for (var i = 0; i < carouselContainers.length; i++) {
        var element = carouselContainers.item(i);
        var image = element.getElementsByTagName('img')[0];
        var imageWidth = image.clientWidth;
        var animationTime = element.dataset.animationTime;
        console.log(image);
        imageCarouselArray[i] = new ImageCarousel();
        imageCarouselArray[i].createCarousel(element, imageWidth, animationTime);
    }
})