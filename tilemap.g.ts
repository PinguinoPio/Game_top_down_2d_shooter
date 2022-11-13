// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "level1":
            case "level1":return tiles.createTilemap(hex`1000100011111111111111111111111111111111110102020e0d0d020202020e0d02031111091212121212121212121212120511110a121412121212121212121212071111101212121212121215151512120f111109121212141212141212121212051111091214121215121212121212120511110a1212121215121212121312120511110a1212121212121212121212120711110a12121412121212141515121207111109121212151212121215121212051111101212121515151212121212120f11110a1212131212141212141214120711110a121212121212121212121212051111080b0c060b0b0c0c0c0c060b0c041111111111111111111111111111111111`, img`
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 2 . . . . . . . . . . . . 2 2 
2 2 . . . . . . . . . . . . 2 2 
2 2 . . . . . . . 2 2 2 . . 2 2 
2 2 . . . . . . . . . . . . 2 2 
2 2 . . . . 2 . . . . . . . 2 2 
2 2 . . . . 2 . . . . . . . 2 2 
2 2 . . . . . . . . . . . . 2 2 
2 2 . . . . . . . . 2 2 . . 2 2 
2 2 . . . 2 . . . . 2 . . . 2 2 
2 2 . . . 2 2 2 . . . . . . 2 2 
2 2 . . . . . . . . . . . . 2 2 
2 2 . . . . . . . . . . . . 2 2 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
`, [myTiles.transparency16,sprites.dungeon.greenOuterNorthWest,sprites.dungeon.greenOuterNorth0,sprites.dungeon.greenOuterNorthEast,sprites.dungeon.greenOuterSouthWest,sprites.dungeon.greenOuterEast0,sprites.dungeon.greenOuterSouth2,sprites.dungeon.greenOuterEast1,sprites.dungeon.greenOuterSouthEast,sprites.dungeon.greenOuterWest1,sprites.dungeon.greenOuterWest0,sprites.dungeon.greenOuterSouth0,sprites.dungeon.greenOuterSouth1,sprites.dungeon.greenOuterNorth1,sprites.dungeon.greenOuterNorth2,sprites.dungeon.greenOuterEast2,sprites.dungeon.greenOuterWest2,sprites.dungeon.floorLight0,sprites.dungeon.floorDark0,sprites.dungeon.floorDark3,sprites.dungeon.floorDark1,sprites.dungeon.stairLadder], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
