
QUnit.test( "大于0的正则", function( assert ) {
    assert.equal( numberReg("0.21"),true, "0.21返回通过" );
    assert.equal( numberReg("2.21"),true, "2.21返回通过" );
    assert.equal( numberReg("21."),false, "21.返回不通过" );
    assert.equal( numberReg(".21"),false, ".21返回不通过" );
    assert.equal( numberReg("A21"),false, "A21返回不通过" );
});
function numberReg(str){
    var carNumber=/[^0-9\.]+/g;
    if(carNumber.test(str)){
        return false
    }else{
        return true
    }
}