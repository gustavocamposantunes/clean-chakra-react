pipeline{
    agent any
    stages{
        stage("Lint") {
            echo 'Running ESLint...'
            sh 'npm run lint'
        }
    }
}