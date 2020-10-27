pipeline {
    agent { dockerfile true }
    stages {
      stage('Push to Registry') {
        steps {
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
    registryUri = 'localhost'
  }
}
