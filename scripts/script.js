const sentences = [
    "Hello, welcome to my portfolio!",
    "I love building web applications.",
    "Frontend development is fun!",
    "Let's collaborate on a project!"
  ]; // The sentences to be typed
  
  const typingSpeed = 100; // Typing speed in milliseconds
  const delayBetweenSentences = 2000; // Delay before next sentence starts
  const fadeInSpeed = 500; // Speed of fade-in in milliseconds
  
  let sentenceIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function typeWriter() {
    const currentSentence = sentences[sentenceIndex];
    const textElement = document.getElementById("typewriter-text");
  
    if (!isDeleting) {
      // Typing phase
      if (charIndex < currentSentence.length) {
        textElement.innerHTML += currentSentence.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, typingSpeed);
      } else {
        // After typing is done, fade in text and icons
        textElement.classList.add('fade-in');
        setTimeout(fadeInIcons, fadeInSpeed);
      }
    }
  }
  
  function fadeInIcons() {
    const icons = document.querySelectorAll('.icon');
    
    icons.forEach((icon, index) => {
      setTimeout(() => {
        icon.classList.add('fade-in');
      }, index * fadeInSpeed); // Delay each icon's fade-in
    });
    
    setTimeout(() => {
      startDeleting(); // Start deletion after icons are faded in
    }, delayBetweenSentences + icons.length * fadeInSpeed);
  }
  
  function startDeleting() {
    const textElement = document.getElementById("typewriter-text");
    const icons = document.querySelectorAll('.icon');
    
    // Fade out icons first
    icons.forEach((icon) => {
      icon.classList.remove('fade-in');
    });
    
    // Fade out text before deleting
    textElement.classList.remove('fade-in');
    
    setTimeout(deleteSentence, fadeInSpeed); // Wait for fade-out to complete
  }
  
  function deleteSentence() {
    const currentSentence = sentences[sentenceIndex];
    const textElement = document.getElementById("typewriter-text");
    
    if (charIndex > 0) {
      // Smoothly reduce opacity while deleting
      isDeleting = true;
      textElement.innerHTML = currentSentence.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(deleteSentence, typingSpeed / 2);
    } else {
      // Move to the next sentence after deletion is done
      isDeleting = false;
      sentenceIndex = (sentenceIndex + 1) % sentences.length;
      setTimeout(typeWriter, typingSpeed);
    }
  }
  
  // Start typing effect when the page loads
  window.onload = typeWriter;
  