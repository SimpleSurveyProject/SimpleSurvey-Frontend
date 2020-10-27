pipeline {
    agent { dockerfile true }
    stages {
        stage('Test') {
            steps {
                npm run test
            }
        }
    }
}
