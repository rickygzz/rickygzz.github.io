var slideIndex = 0;

window.onload = function()
{
    // Show the slide once the page finishes loading.
    showSlides();
}

function showSlides()
{
    var slides = document.getElementsByClassName("mySlides");

    // console.log('Length:' + slides.length);

    if (slides.length == 0)    
    {
        return;
    }

    slideIndex++;

    if (slideIndex > slides.length)
    {
        slideIndex = 1;
    }
    else if (slideIndex < 1)
    {
        slideIndex = slides.length;
    }

    for (var i = 0; i < slides.length; i++)
    {
        slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "block";

    setTimeout(showSlides, 3000);
}