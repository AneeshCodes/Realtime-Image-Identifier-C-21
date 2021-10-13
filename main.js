function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet', modelLoaded)
}

function preload(){

}

function draw(){
  image(video, 0, 0, 300, 300);
  classifier.classify(video, gotResult);
}

function modelLoaded(){
  console.log('Model has been successfully loaded')
}

previousResult = ""

function gotResult(error, results){
  if(error){
    console.log(error)
  }
  else{
    confidence = results[0].confidence;
    label = results[0].label
    if((confidence >= 0.5) && (previousResult != label)){
      console.log(results)
      previousResult = label
      synth = window.speechSynthesis
      speakData = 'Object Detected Is ' + label;
      utterThis = new SpeechSynthesisUtterance(speakData)
      synth.speak(utterThis);
      accuracy = (confidence * 100).toFixed(0) + '%'
      document.getElementById('name').innerHTML = label;
      document.getElementById('accuracy').innerHTML = accuracy;
    }
  }
}