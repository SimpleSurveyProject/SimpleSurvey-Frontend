pipeline {
  agent any
  stages {

    stage('Build') {
      steps {
        echo 'Building container image...'
        script {
          dockerInstance = docker.build(imageName)
        }

      }
    }

    stage('Push to registry') {
      steps {
        echo 'Pushing container image to the local registry...'
        script {
          docker.withRegistry(registryUri) {
            dockerInstance.push("${env.BUILD_NUMBER}")
            dockerInstance.push("latest")
          }
        }

      }
    }

  }
  environment {
    imageName = 'simplesurvey_frontend'
    registryUri = 'http://localhost:5000'
    dockerInstance = ''
  }
}
