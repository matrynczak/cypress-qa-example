Project has got 2 parts:
1. scenarios of shopping cart + checkout process
2. 5 scenarios automated due to instruction

Scenarios of point 1 are stored in the SCENARIOS.md file in the root folder.

Automated scenarios of point 2 are stored in the 'cypress/ingtegration' folder.

    How to run the automated scenarios?
    
Prerequisites:
* installed Node >= 12
* installed Yarn package manager or install that by 


`    npm install yarn
`
    
* installed Chrome browser


    Installing the dependencies:
    
To install the dependencies please run the command:

`    yarn install
`    

Once all of the dependencies are installed you can start testing.

    Tests execution:
    
There are 2 ways of running tests:
1. Open - it opens Cypress interaction/debugger window and you can choose which file you want to execute
2. Run - run the tests in the background (you can still choose the spec to run - details in the Cypress documentation)


   Open:
   
    
`    yarn run cypress open     
`


   Run:
   
    
`    yarn run cypress run 
`   
    
    
Automation files have got comments if which has my concerns/doubts or additional explanation.
