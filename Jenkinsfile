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
        stage('Deploy Coverage') {
            steps {
                echo 'Deploying Coverage to GitHub...'
                script {
                    sh 'git config --global user.email "gustavocamposantunes@gmail.com"'
                    sh 'git config --global user.name "Gustavo Decante"'

                    withCredentials([string(credentialsId: '79f3d47c-31df-4fc7-9f9b-6f5746833f50', variable: 'GITHUB_TOKEN')]) {
                        sh 'git clone https://${GITHUB_TOKEN}@github.com/gustavocamposantunes/coverage-repo.git'
                    }

                    sh 'cp -r coverage/ coverage-repo/'

                    dir('coverage-repo') {
                        sh 'git add .'
                        sh 'git commit -m "chore: update test coverage"'
                        sh 'git push origin master'
                    }
                }
            }

        }
    }
}