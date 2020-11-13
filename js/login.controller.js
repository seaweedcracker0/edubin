app.controller("LoginController", loginController);

loginController.$inject = ['$scope'];
function loginController($scope) {
    $scope.registerType = [
        {
            value : 'Teacher',
            schoolType : false
        },
        {
            value: 'Parent',
            schoolType : false
        },
        {
            value : 'Student',
            schoolType : false
        },
        {
            value : 'Uni/school/institutions',
            schoolType : true
        }
    ]
    $scope.school = false;
    $scope.selected = $scope.registerType[0];
    

    $scope.initComponentController = () => {
        $scope.showSchoolField($scope.selected);
    }

    // Init Section Control 
    $scope.registerPage = false;
    $scope.loginPage = true; 
    $scope.forgotPassPage = true;
     
    $scope.showSchoolField = function(obj) {
        $scope.school = false;

        if (obj.schoolType)
            $scope.school = true;
            
    };

    $scope.resetForm = function () {
        document.getElementById("register-form").reset();
        document.getElementById("login-form").reset();
        document.getElementById("forgotpassword-form").reset();
    }
}