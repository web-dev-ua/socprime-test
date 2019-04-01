export default ($http) => {
    return {
        restrict: 'E',
        scope: {
            needle: '=value',
            source: '=source',
        },
        template: '<ul>' +
                    '<li class="animate-repeat" ng-repeat="item in list">{{item}}</li>' +
                '</ul>',
        link: function(scope, element, attrs) {
            scope.list = [];

            scope.$watch('needle', function() {
                getListData();
            });

            function getListData() {
                $http.get(scope.source, {
                    params: {needle: scope.needle}
                }).then(function (response) {
                    if (response.status === 200) {
                        scope.list = response.data;
                    }
                });
            }

        }
    };
}