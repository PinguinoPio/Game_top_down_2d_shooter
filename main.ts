namespace SpriteKind {
    export const Bomb = SpriteKind.create()
    export const bossv1 = SpriteKind.create()
    export const boss_projectile = SpriteKind.create()
}
function set_led () {
    light.setAll(0x000000)
    for (let index = 0; index <= bomb_count - 1; index++) {
        light.setPixelColor(index, 0x00ff00)
    }
}
sprites.onOverlap(SpriteKind.Bomb, SpriteKind.bossv1, function (sprite, otherSprite) {
    sprite.destroy(effects.disintegrate, 500)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.bossv1, function (sprite, otherSprite) {
    boss_health += -1
    if (boss_health == 0) {
        otherSprite.destroy(effects.disintegrate, 500)
        info.changeScoreBy(150)
        game.over(true)
    }
    sprite.destroy()
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (0 < bomb_count) {
        trap = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . 2 2 . . . 
            . . . . . . . . . d 5 4 . . . . 
            . . . . . . . . d . . . . . . . 
            . . . . . . . . d . . . . . . . 
            . . . . . . . f f f . . . . . . 
            . . . . . . f b b c f . . . . . 
            . . . . . . f f f f f . . . . . 
            . . . . . f b b b b c f . . . . 
            . . . . f b b b b b c c f . . . 
            . . . . f b b b b c c c f . . . 
            . . . . f b b b c c c c f . . . 
            . . . . . f b c c c c f . . . . 
            . . . . . . f f f f f . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, hero, 0, 0)
        trap.setKind(SpriteKind.Bomb)
        bomb_count += -1
        trap.scale = 1
    }
    set_led()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 2 2 2 2 . . . . . . . 
        . . . . 2 2 2 2 2 2 . . . . . . 
        . . . . 2 2 2 2 2 4 . . . . . . 
        . . . . 2 2 2 2 4 4 . . . . . . 
        . . . . 2 2 2 4 4 4 . . . . . . 
        . . . . . 2 4 4 4 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, hero, Math.cos(facing_direction) * 150, Math.sin(facing_direction) * 150)
    projectile.startEffect(effects.fire, 2000)
})
info.onCountdownEnd(function () {
    Boss_1 = sprites.create(img`
        .f.........ff.........f.
        ..ff.......ff.......ff..
        ..f1ff....f1bf....ff1f..
        ...fb1f...f1bf...f1bf...
        ...fbb1f..ffff..f1bbf...
        ....fbb1ff1bbbff1bbf....
        .....fff11111bbbfff.....
        .....f1bff11bbffbbf.....
        .....f1bbbfbffbbbbf.....
        ..fff11fbbbfbbbbfbbfff..
        ff11f1f1fbbfbbbf1f1f11ff
        ff1bf1f22fbbfbf22f1fb1ff
        ..fff1f221fbff122f1fff..
        ....f11fffbffbfff11f....
        .....f1bbffbbff111f.....
        .....f1ff111111ff.f.....
        ......fbb11ff11bbf......
        .......fbbf1bfbbf.......
        .......fbfb1b1fbf.......
        .......fbfb1b1fbf.......
        .......fbbffffbbf.......
        .......fb11bb11bf.......
        ........fb1111bf........
        .........ffffff.........
        `, SpriteKind.bossv1)
    boss_health = 10
    Boss_1.setPosition(128, 128)
    spawn_enemie = 0
    info.stopCountdown()
})
sprites.onOverlap(SpriteKind.Bomb, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.scale = sprite.scale * 0.95
    if (sprite.scale < 0.86) {
        sprite.destroy(effects.disintegrate, 500)
    }
    otherSprite.destroy(effects.ashes, 500)
    info.changeScoreBy(5)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.boss_projectile, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.ashes, 500)
    pause(500)
    sprite.destroy()
    info.changeScoreBy(5)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy()
    pause(1000)
})
let spawn_y = 0
let spawn_x = 0
let enemy_spawnedge = 0
let my_enemy: Sprite = null
let boss_projectile: Sprite = null
let Boss_1: Sprite = null
let projectile: Sprite = null
let trap: Sprite = null
let boss_health = 0
let spawn_enemie = 0
let bomb_count = 0
let facing_direction = 0
let hero: Sprite = null
hero = sprites.create(img`
    . . f . . . . f . . . . . . . . 
    . . . f f . . . f f . . . . . . 
    . . . f 4 f . . f 4 f . . . . . 
    . . . . f 4 f . f 4 4 f . . . . 
    . f f f f 4 4 f 4 4 4 4 f . . . 
    f f b b b b 4 1 f 4 1 f 4 f . . 
    f b b b 4 4 b 4 4 4 4 4 4 f f 2 
    f b b b 4 4 b 4 4 f 4 4 b b 2 5 
    f b b b 4 4 b f f 4 4 4 b b 2 4 
    f f b b 4 4 4 4 4 4 4 4 f f f 2 
    . f f f f 4 4 4 4 4 4 f . . . . 
    . 2 4 2 f 4 4 f f 4 4 f . . . . 
    . 4 5 2 f 4 f . . f 4 f . . . . 
    . 5 . 4 f 4 f . . f 4 f . . . . 
    . . . 5 f 4 4 f . f 4 4 f . . . 
    . . . . . f f . . . f f . . . . 
    `, SpriteKind.Player)
info.startCountdown(5)
info.setLife(5)
info.setScore(0)
controller.moveSprite(hero, 75, 75)
facing_direction = 0
tiles.setCurrentTilemap(tilemap`level1`)
scene.cameraFollowSprite(hero)
bomb_count = 3
light.setAll(0x000000)
spawn_enemie = 1
game.onUpdateInterval(5000, function () {
    if (3 > bomb_count) {
        bomb_count += 1
        console.logValue("bombs", bomb_count)
    }
    set_led()
})
game.onUpdateInterval(750, function () {
    if (spawn_enemie == 0) {
        boss_projectile = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . a a a c c . . . . . 
            . . . . . a a a a a c c . . . . 
            . . . . a a a a a c c c c . . . 
            . . . . a a a a c c c c c . . . 
            . . . . a a a a c c c c c . . . 
            . . . . c a a c c c c c c . . . 
            . . . . c c c c c c c c c . . . 
            . . . . . c c c c c c c . . . . 
            . . . . . . c c c c c . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.boss_projectile)
        boss_projectile.setPosition(128, 128)
        boss_projectile.setVelocity((hero.x - 128) / 1, (hero.y - 128) / 1)
        boss_projectile.setFlag(SpriteFlag.AutoDestroy, true)
        boss_projectile.setFlag(SpriteFlag.GhostThroughWalls, true)
    }
})
game.onUpdateInterval(2000, function () {
    if (spawn_enemie == 1) {
        my_enemy = sprites.create(img`
            ........................
            ........................
            ........................
            ........................
            ..........ffff..........
            ........ff1111ff........
            .......fb111111bf.......
            .......f11111111f.......
            ......fd11111111df......
            ......fd11111111df......
            ......fddd1111dddf......
            ......fbdbfddfbdbf......
            ......fcdcf11fcdcf......
            .......fb111111bf.......
            ......fffcdb1bdffff.....
            ....fc111cbfbfc111cf....
            ....f1b1b1ffff1b1b1f....
            ....fbfbffffffbfbfbf....
            .........ffffff.........
            ...........fff..........
            ........................
            ........................
            ........................
            ........................
            `, SpriteKind.Enemy)
        my_enemy.follow(hero, 50)
        while (true) {
            enemy_spawnedge = randint(0, 359) * 3.1415926536 / 180
            spawn_x = hero.x + Math.cos(enemy_spawnedge) * 100
            spawn_y = hero.y + Math.sin(enemy_spawnedge) * 100
            if (spawn_x > 32 && (spawn_x < 224 && spawn_y < 224 && spawn_y > 32)) {
                break;
            }
        }
        my_enemy.setPosition(spawn_x, spawn_y)
    }
})
game.onUpdateInterval(150, function () {
    if (controller.left.isPressed() && (!(controller.up.isPressed()) && !(controller.down.isPressed()))) {
        hero.setImage(img`
            . . . . . . . . f . . . . f . . 
            . . . . . . f f . . . f f . . . 
            . . . . . f 4 f . . f 4 f . . . 
            . . . . f 4 4 f . f 4 f . . . . 
            . . . f 4 4 4 4 f 4 4 f f f f . 
            . . f 4 f 1 4 f 1 4 b b b b f f 
            2 f f 4 4 4 4 4 4 b 4 4 b b b f 
            5 2 b b 4 4 f 4 4 b 4 4 b b b f 
            4 2 b b 4 4 4 f f b 4 4 b b b f 
            2 f f f 4 4 4 4 4 4 4 4 b b f f 
            . . . . f 4 4 4 4 4 4 f f f f . 
            . . . . f 4 4 f f 4 4 f 2 4 2 . 
            . . . . f 4 f . . f 4 f 2 5 4 . 
            . . . . f 4 f . . f 4 f 4 . 5 . 
            . . . f 4 4 f . f 4 4 f 5 . . . 
            . . . . f f . . . f f . . . . . 
            `)
        facing_direction = 3.1415926536
    }
    if (controller.left.isPressed() && (controller.up.isPressed() && !(controller.down.isPressed()))) {
        hero.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . 2 2 2 2 2 . . . . . . . 
            . . . . 2 2 . . . . . . . . . . 
            . . . . 2 . 2 . . . . . . . . . 
            . . . . 2 . . 2 . . . . . . . . 
            . . . . 2 . . . 2 . . . . . . . 
            . . . . . . . . . 2 . . . . . . 
            . . . . . . . . . . 2 . . . . . 
            . . . . . . . . . . . 2 . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
        facing_direction = 3.926990817
    }
    if (controller.right.isPressed() && (!(controller.up.isPressed()) && !(controller.down.isPressed()))) {
        hero.setImage(img`
            . . f . . . . f . . . . . . . . 
            . . . f f . . . f f . . . . . . 
            . . . f 4 f . . f 4 f . . . . . 
            . . . . f 4 f . f 4 4 f . . . . 
            . f f f f 4 4 f 4 4 4 4 f . . . 
            f f b b b b 4 1 f 4 1 f 4 f . . 
            f b b b 4 4 b 4 4 4 4 4 4 f f 2 
            f b b b 4 4 b 4 4 f 4 4 b b 2 5 
            f b b b 4 4 b f f 4 4 4 b b 2 4 
            f f b b 4 4 4 4 4 4 4 4 f f f 2 
            . f f f f 4 4 4 4 4 4 f . . . . 
            . 2 4 2 f 4 4 f f 4 4 f . . . . 
            . 4 5 2 f 4 f . . f 4 f . . . . 
            . 5 . 4 f 4 f . . f 4 f . . . . 
            . . . 5 f 4 4 f . f 4 4 f . . . 
            . . . . . f f . . . f f . . . . 
            `)
        facing_direction = 0
    }
    if (controller.right.isPressed() && (controller.up.isPressed() && !(controller.down.isPressed()))) {
        hero.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 2 2 2 2 2 . . . . 
            . . . . . . . . . . 2 2 . . . . 
            . . . . . . . . . 2 . 2 . . . . 
            . . . . . . . . 2 . . 2 . . . . 
            . . . . . . . 2 . . . 2 . . . . 
            . . . . . . 2 . . . . . . . . . 
            . . . . . 2 . . . . . . . . . . 
            . . . . 2 . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
        facing_direction = 5.4977871438
    }
    if (controller.down.isPressed() && (!(controller.right.isPressed()) && !(controller.left.isPressed()))) {
        hero.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 2 . . . . . . . . 
            . . . . . . . 2 . . . . . . . . 
            . . . . . . . 2 . . . . . . . . 
            . . . . . . . 2 . . . . . . . . 
            . . . . . . . 2 . . . . . . . . 
            . . . . . . . 2 . . . . . . . . 
            . . . . 2 . . 2 . . 2 . . . . . 
            . . . . . 2 . 2 . 2 . . . . . . 
            . . . . . . 2 2 2 . . . . . . . 
            . . . . . . . 2 . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
        facing_direction = 1.5707963268
    }
    if (controller.down.isPressed() && (controller.left.isPressed() && !(controller.right.isPressed()))) {
        hero.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . 2 . . . . 
            . . . . . . . . . . 2 . . . . . 
            . . . . 2 . . . . 2 . . . . . . 
            . . . . 2 . . . 2 . . . . . . . 
            . . . . 2 . . 2 . . . . . . . . 
            . . . . 2 . 2 . . . . . . . . . 
            . . . . 2 2 . . . . . . . . . . 
            . . . . 2 2 2 2 2 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
        facing_direction = 2.3561944902
    }
    if (controller.down.isPressed() && (controller.right.isPressed() && !(controller.left.isPressed()))) {
        hero.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . 2 . . . . . . . . . . . 
            . . . . . 2 . . . . . . . . . . 
            . . . . . . 2 . . . . . . . . . 
            . . . . . . . 2 . . . 2 . . . . 
            . . . . . . . . 2 . . 2 . . . . 
            . . . . . . . . . 2 . 2 . . . . 
            . . . . . . . . . . 2 2 . . . . 
            . . . . . . . 2 2 2 2 2 . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
        facing_direction = 0.7853981634
    }
    if (controller.up.isPressed() && (!(controller.left.isPressed()) && !(controller.right.isPressed()))) {
        hero.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 2 . . . . . . . . 
            . . . . . . 2 2 2 . . . . . . . 
            . . . . . 2 . 2 . 2 . . . . . . 
            . . . . 2 . . 2 . . 2 . . . . . 
            . . . . . . . 2 . . . . . . . . 
            . . . . . . . 2 . . . . . . . . 
            . . . . . . . 2 . . . . . . . . 
            . . . . . . . 2 . . . . . . . . 
            . . . . . . . 2 . . . . . . . . 
            . . . . . . . 2 . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
        facing_direction = 4.7123889804
    }
})
