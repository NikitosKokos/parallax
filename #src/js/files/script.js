
document.addEventListener('DOMContentLoaded', () => {
    const parallax = document.querySelector('.parallax');

    if(parallax){
        const content = document.querySelector('.parallax__content');
        const clouds = document.querySelector('.images-parallax__clouds');
        const mountains = document.querySelector('.images-parallax__mountains');
        const human = document.querySelector('.images-parallax__human');

        const forClouds = 40;
        const forMountains = 20;
        const forHuman = 10;

        const speed = 0.1;

        let positionX = 0, positionY = 0,
            coordXprocent = 0, coordYprocent = 0;

        const setMouseParallaxStyle = () => {
            const distX = coordXprocent - positionX;
            const distY = coordYprocent - positionY;

            positionX += distX * speed;
            positionY += distY * speed;

            const styleForItem = (item, forItem) => {
                item.style.cssText = `transform: translate(${positionX / forItem}%, ${positionY / forItem}%)`;
            }
            styleForItem(clouds, forClouds);
            styleForItem(mountains, forMountains);
            styleForItem(human, forHuman);
            
            requestAnimationFrame(setMouseParallaxStyle);
        }
        setMouseParallaxStyle();

        parallax.addEventListener('mousemove', (e) => {
            const parallaxWidth = parallax.offsetWidth;
            const parallaxHeight = parallax.offsetHeight;

            const coordX = e.pageX - parallaxWidth / 2;
            const coordY = e.pageY - parallaxHeight / 2;

            coordXprocent = coordX / parallaxWidth * 100;
            coordYprocent = coordY / parallaxHeight * 100;
        });

        let thresholdSets = [];
        for (let i = 0; i < 1.0; i += 0.005) {
            thresholdSets.push(i);
        }

        const callback = (entries, observer) => {
            const scrollTopProcent = window.pageYOffset / parallax.offsetHeight * 100;
            setParallaxItemStyle(scrollTopProcent);
        }

        const observer = new IntersectionObserver(callback, {
            threshold:  thresholdSets
        });

        observer.observe(document.querySelector('.text'));

        const setParallaxItemStyle = (scrollTopProcent) => {
            content.style.cssText = `transform: translate(0%, -${scrollTopProcent / 9}%)`;
            mountains.parentElement.style.cssText = `transform: translate(0%, -${scrollTopProcent / 6}%)`;
            human.parentElement.style.cssText = `transform: translate(0%, -${scrollTopProcent / 3}%)`;
        }
    }

}); // end