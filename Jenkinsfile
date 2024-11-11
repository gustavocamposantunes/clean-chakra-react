pipeline{
    agent any

    tools {
        nodejs 'node23'
    }    

    stages{
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }
        stage('Lint') {
            steps {
                echo 'Running ESLint...'
                sh 'npm run lint'
            }
        }
        stage('Test Coverage') {
            steps {
                echo 'Running Coverage...'
                sh 'npm run test:coverage'
            }
        }
    }
}