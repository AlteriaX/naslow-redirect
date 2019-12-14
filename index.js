module.exports = function NaslowRedirect(mod) {

	const Vec3 = require('tera-vec3'),
		command = mod.command || mod.require.command

	const tuluone = new Vec3(-52409, -38523, 2421),
		tulutwo = new Vec3(-56613, -37055, 2456),
		acaone = new Vec3(-10658, -66961, 2518),
		acatwo = new Vec3(-9347, -69221, 2697),
		fronone = new Vec3(-41297, 56054, 104),
		frontwo = new Vec3(-44346, 59130, 340),
		cw = new Vec3(-11987, 87962, -463),
		pathone = new Vec3(12878, -24318, -134),
		pathtwo = new Vec3(12494, -29119, 209)

	let enabled = false
	
	mod.hook('S_LOAD_TOPO', 3, event => {
		inTulu = (event.zone === 7003)
		inAcarum = (event.zone === 7012)
		inFron = (event.zone === 2)
		inFrontwo = (event.zone === 7013)
		inBR = (event.zone === 7015)
		inPath = (event.zone === 3)
		inPathtwo = (event.zone === 7023)
	})
	
	mod.hook('S_SPAWN_ME', 3, event => {
		if(!enabled) return
        if(inTulu && (tuluone.dist3D(event.loc) <= 5 || tulutwo.dist3D(event.loc) <= 5)) {
            event.loc = new Vec3(-64994, -35251, 1365)
			event.w = -1.43
			setTimeout(function() { enabled = false }, 3000)
			return true
		}
        if(inAcarum && (acaone.dist3D(event.loc) <= 5 || acatwo.dist3D(event.loc) <= 5)) {
            event.loc = new Vec3(-29123, -74204, 6510) 
			event.w = 0.01
			setTimeout(function() { enabled = false }, 3000)
			return true
		}
        if((inFron || inFrontwo) && (fronone.dist3D(event.loc) <= 5 || frontwo.dist3D(event.loc) <= 5)) {
            event.loc = new Vec3(-22804, 61231, 421)
			event.w = -2.12
			setTimeout(function() { enabled = false }, 3000)
			return true
		}
		if(inBR && cw.dist3D(event.loc) <= 5) {
            event.loc = new Vec3(-13154, 88385, -1588)
			event.w = 2.62
			setTimeout(function() { enabled = false }, 3000)
			return true
		}
		if((inPath || inPathtwo) && (pathone.dist3D(event.loc) <= 5 || pathtwo.dist3D(event.loc) <= 5)) {
            event.loc = new Vec3(15449, -53895, -5266)
			event.w = 3.09
			setTimeout(function() { enabled = false }, 3000)
			return true
		}
	})
	
	command.add('nas', () => {
		enabled = !enabled
		command.message('Module ' + (enabled ? 'enabled' : 'disabled'))
	})
}