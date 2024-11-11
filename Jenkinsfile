pipeline{
    agent any

    tools {
        nodejs 'node23'
    }

    stages{
        stage('Lint') {
            steps {
                echo 'Running ESLint...'
                sh 'npm run lint'
            }
        }
    }
}