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
        this.isChangingSlide = false;
        

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
        previousArrow.onmouseover = function() 
        {
            this.style.color = "#717171";
        }
        previousArrow.onmouseleave = function() 
        {
            this.style.color = "#ffffff";
        }
        previousArrow.onclick = function() {
            if (!self.isChangingSlide) changeSlide(-1, self);
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
        nextArrow.onmouseover = function() 
        {
            this.style.color = "#717171";
        }
        nextArrow.onmouseleave = function() 
        {
            this.style.color = "#ffffff";
        }
        nextArrow.onclick = function() {
            console.log(self.isChangingSlide)
            if (!self.isChangingSlide) changeSlide(1, self);
        }
        this.element.appendChild(nextArrow);

        //create slider bottom dots
        var sliderDotsContainer = document.createElement('div');
        sliderDotsContainer.style.position = "absolute";
        sliderDotsContainer.style.bottom = "20px";
        sliderDotsContainer.style.left = this.width / 2 - this.totalImages * 25 / 2 + "px";
        this.element.appendChild(sliderDotsContainer);
        this.dots = [];

        for (var i = 0; i < this.totalImages; i++){
            let dot = document.createElement('span');
            dot.className = "slider-dots";
            dot.id = "slider-dot" + i;
            dot.style.cursor= "pointer";
            dot.style.height = "15px";
            dot.style.width = "15px";
            dot.style.margin = "0 5px";
            dot.style.backgroundColor = "#bbbbbb";
            dot.style.borderRadius = "50%";
            dot.style.display = "inline-block";
            dot.style.transition = "background-color 0.6s ease";
            if (i === 0) {
                dot.style.backgroundColor = "#717171";
                dot.classList.add("slider-dot-selected");
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
            dot.onclick = function() {
                selectSliderDot(self, dot);
                this.isChangingSlide = true;
            }
            this.dots.push(dot);
            sliderDotsContainer.appendChild(dot);
        }
    }

    //private functions

    //select slider dots
    var selectSliderDot = function( self, selectedDot = null){
        var selectedDot = selectedDot;
        if (selectedDot === null) {
            let dotIndex = self.currentImageIndex - 1;
            selectedDot = document.getElementById("slider-dot" + dotIndex);
            console.log("hi", dotIndex, selectedDot, self.dots)
        }
        for (var dot in self.dots) {
            if (self.dots[dot].classList.contains("slider-dot-selected")){
                self.dots[dot].classList.remove("slider-dot-selected");
                self.dots[dot].style.backgroundColor = "#bbbbbb";
                console.log("what is", self.dots[dot])
            }
            if (self.dots[dot] === selectedDot) {
                let direction = 0;
                var changeTo = Number(dot) + 1;
                if (changeTo != self.currentImageIndex) {
                    direction = changeTo > self.currentImageIndex ? 1 : -1;
                    changeSlide(direction, self, changeTo)
                    self.isChangingSlide = true;
                }
            }
        }
        selectedDot.classList.add("slider-dot-selected");
        selectedDot.style.backgroundColor = "#717171";
    }

    //change the slide
    var changeSlide = function(direction, self, changeTo = null){
        self.isChangingSlide = true;
        var moveLength = 10;
        var incrementMoveLength = 10;
        var totalIntervals = self.width/ 10;
        var intervalTime = self.animationTime / totalIntervals;
        var widthPerSlide = self.imageWrapper.clientWidth - self.width;
        var direction = direction;
        var currentPosition = (self.currentImageIndex - 1) * self.width;
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

        if (changeTo) {
            widthPerSlide = self.width + Math.abs(self.currentImageIndex - changeTo) * self.width;
            self.currentImageIndex = changeTo;
            intervalTime = 10;
            moveLength = 50;
            incrementMoveLength = 50;
        }
        var timer = setInterval(function() {

            self.imageWrapper.style.transform = "translate("+ (-currentPosition + (-direction * moveLength)) +"px, 0px)";
            console.log(currentPosition)
            moveLength += incrementMoveLength;
            console.log(moveLength, widthPerSlide)
            if (moveLength > widthPerSlide) {
                clearInterval(timer);
                self.isChangingSlide = false;
                return;
            }
        }, intervalTime)
        selectSliderDot(self);
    }
}

window.addEventListener("load", () => {
    var carouselContainers = document.getElementsByClassName("carousel-container");
    var imageCarouselArray = [];
    var animationTime = 0;
    for (var i = 0; i < carouselContainers.length; i++) {
        var element = carouselContainers.item(i);
        var image = element.getElementsByTagName('img')[0];
        var imageWidth = image.clientWidth;
        var animationTime = element.dataset.animationTime;
        //set default incase dataset not found
        if (animationTime === 0) animationTime = 500;
        imageCarouselArray[i] = new ImageCarousel();
        imageCarouselArray[i].createCarousel(element, imageWidth, animationTime);
    }
})