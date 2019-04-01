export default ($http, $compile) => {
    return {
        restrict: 'A',
        require : "ngModel",
        scope: {
            source: '=autocomplete',
            ngModel:'&'
        },
        link: function(scope, element, attrs, ngModel) {
            scope.list = [];

            element.wrap('<div class="autocomplete"></div>');
            let listEl = angular.element('<ul><li class="animate-repeat" ng-click="selectItem(item)" ng-repeat="item in list">{{item}}</li></ul>');
            element.after(listEl);
            $compile(listEl)(scope);

            scope.$watch(scope.ngModel, function (val) {
                getListData(val);
            });

            function getListData(needle) {
                $http.get(scope.source, {
                    params: {needle: needle}
                }).then(function (response) {
                    if (response.status === 200) {
                        scope.list = response.data;
                    }
                });
            }

            scope.selectItem = (item) => {
                ngModel.$setViewValue(item);
                element.val(item);
            };
        }
    };
}