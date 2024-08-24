const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const loader = document.querySelector('#before-loading');
const counter = document.querySelector('.counter');
var loading = true;


var frames = {
    curIndex: 0,
    maxIndex: 468,
}

const images = [];
var imgLoaded = 0;

function preLoader() {
    for (var i = 0; i <= frames.maxIndex; i++) {
        const img = new Image();

        img.src = `./public/frames/frame-(${i + 1}).png`;
        // console.log(`image loaded ${i + 1}`);
        img.onload = () => {
            imgLoaded++;
            counter.innerHTML = `${Math.floor((imgLoaded / frames.maxIndex) * 100)}%`;
            if (imgLoaded == frames.maxIndex) {
                console.log("All images loaded");
                completed();
                loadImage(frames.curIndex);
                animation();
            }
        }
        images.push(img);
    }

}

function completed() {
    gsap.to(loader, {
        y: "-100%",
        opacity: 0,
        duration: 0.4,
    })
    document.querySelector('#after-loading').style.display = "block";
}

function loadImage(index) {
    loader.remove();
    if (index => 0 && index <= frames.maxIndex) {
        const img = images[index];

        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.min(scaleX, scaleY);

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        //setting the image to the center of the canvas
        const offsetX = (canvas.width) / 14;
        const offsetY = (canvas.height) / 512;

        //drawing the images
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingQuality = "high";
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);
        frames.curIndex = index;
    }
}

function animation() {
    gsap.to(frames, {
        curIndex: frames.maxIndex,
        ease: "none",
        onUpdate: () => {
            loadImage(Math.floor(frames.curIndex));
        },
        scrollTrigger: {
            trigger: "main",
            start: "-2% top",  //moving-part fix-part
            end: "bottom bottom",
            scrub: 1,
        }
    })
}

preLoader();
// animations

gsap.to("#floating_text_1", {
    x: "-100%",
    opacity: 0,
    scrollTrigger: {
        trigger: "#floating_text",
        start: "-20% 25%",
        end: "120% 25%",
        scrub: 1,
    }
})

gsap.to("#floating_text_2", {
    x: "100%",
    opacity: 0,
    duration: 1,
    scrollTrigger: {
        trigger: "#floating_text",
        start: "-20% 25%",
        end: "120% 25%",
        scrub: 1,
    }
})

// 1st page animation
var tlForPage_1 = gsap.timeline({
    scrollTrigger: {
        trigger: "#page_1",
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: true
    }
});

tlForPage_1.from("#page_1_1", {
    x: "-100%",
    opacity: 0,
})

tlForPage_1.from("#page_1_2", {
    x: "100%",
    opacity: 0
})

// function to split text into letters
function splitText(selector) {
    const element = document.querySelector(selector);
    if (!element) return;

    const text = element.textContent;
    const chars = text.split('').map(char => {
        const span = document.createElement('span');
        span.textContent = char;
        return span;
    });

    element.innerHTML = '';
    chars.forEach(span => element.appendChild(span));

    return { chars };
}


// second page animation

var splitP11 = splitText('#page_2_2 #page_2_one');
var splitP12 = splitText('#page_2_2 #page_2_two');
var split1 = splitP11.chars.concat(splitP12.chars);

const tlForPage_2 = gsap.timeline({
    scrollTrigger: {
        trigger: "#page_2",
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 0.75,
    }
}).set(split1, {
    color: "#fff",
    stagger: 0.1,
}, 0.1);

tlForPage_2.from("#page_2_1", {
    x: "-50%",
    opacity: 0,
}, "<");

// 3rd page animation
var splitP21 = splitText('#page_3_1 #page_3_one');
var splitP22 = splitText('#page_3_1 #page_3_two');
var split2 = splitP21.chars.concat(splitP22.chars);

const tlForPage_3 = gsap.timeline({
    scrollTrigger: {
        trigger: "#page_3",
        start: "top top",
        end: "+=150%",
        pin: true,  //for pining put scroller top and bottom at same position
        scrub: 0.75,
    }

})
    .set(split2, {
        color: "#fff",
        stagger: 0.1,
    }, 0.1);

tlForPage_3.from("#page_3_2", {
    x: "100%",
    opacity: 0
}, "-=.5");

// navigation bar
gsap.to("#navigationBar", {
    color: "black",
    scrollTrigger: {
        trigger: "#after-main",
        start: "top top",
        end: "top top",
        scrub: true,
    }
})

gsap.to("#navigationBar", {
    color: "white", 
    scrollTrigger: {
        trigger: "#roadMap",
        start: "top top",
        end: "top top",
        scrub: true,
    }
})
