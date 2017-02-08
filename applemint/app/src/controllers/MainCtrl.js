'use strict';

function MainCtrl($scope, DataService) {
    var vm = this;
    vm.allWorks = [];
    vm.works = [];
    vm.cats = {};
    vm.testMsg = 'hello';
    vm.activeCat = 'all';
    vm.allVisible = false;
    vm.blocks = [];


    DataService.getAllItems().then(function(data){
        vm.allWorks = data;
        vm.works = vm.allWorks;
        processData();
    });

    vm.changeCat = function(nCat) {
        vm.activeCat = nCat;
        if (nCat == 'all') {
            vm.works = vm.allWorks;
        } else {
            vm.works = vm.allWorks.filter(function(el,i){
                return el.category == nCat;
            });
        }

        vm.allVisible = false;

        console.log(vm.works);
    };

    vm.showAll = function() {
        vm.allVisible = true;
        var x = Math.ceil((vm.works.length - 7) / 4);
        console.log(x);
        //x = new Array(Math.ceil(x));

        vm.blocks = [];
        for (var i=0; i<x; i++) {
            vm.blocks.push(i+1);
        }

        console.log(x);
        console.log(vm.blocks);
        console.log(vm.blocks.length);
    };

    function processData(){
        if (vm.works.length) {
            console.log(vm.allWorks);
            vm.cats = getCats();
            console.log(vm.cats);
        }
    };




    // get all unique cats from works arr
    // return obj of objs (named by cat name) with fields
    // title, numb (of items)
    // ------------------------------------------------------
    function getCats(){
        var res = {};

        res['all'] = {
            numb: 0,
            title: 'Все работы',
            name: 'all'
        };

        vm.allWorks.forEach(function(el, i){
            res['all'].numb ++;
            console.log(el.category);
            var cat = el.category;
            console.log(res.hasOwnProperty(cat));
            if (res.hasOwnProperty(cat)) {
                res[cat].numb++;

            } else {
                res[cat] = {};
                res[cat].numb = 1;
                res[cat].title = el.catTitle;
                res[cat].name = el.category;
            }

        });

        return res;
    };



};