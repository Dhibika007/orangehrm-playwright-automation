export function generateEmployee(){
    const timestamp = Date.now();  
    return{
        firstName: `Dhipika${timestamp}`,
        lastName: 'Test'
    };
}