
# Elemental Yoga v01

This is a research project with the goal of building a portable
VR experience (aka Google DayDream + Oculus Quest).

The minimum required controller is going to be a single 3-dof input
because that's all my daydream has, but the plan is to also support
a single 6-dof controller as well. 2x 6-dof controllers are out of scope.

# Feature Status

 - [x] Server returns some html document
 - [x] Server returns VR-capable application
 - [x] VR-capable application detects ray-cast pointer
 - [x] ray-cast pointer can select individual objects
 - [ ] individual object positions are returned to server
 - [ ] think of more feature details


# Running The Server


```bash
python server.py
```

# Docs

See

 - https://doc.babylonjs.com/api/globals
 - https://doc.babylonjs.com/how_to/interactions#pointer-interactions
 - https://doc.babylonjs.com/examples/
 - https://doc.babylonjs.com/how_to/meshbehavior
 - https://doc.babylonjs.com/how_to/webvr_helper

# Misc Info

The server creates a `scratch` directory to store runtime data an it tries to
remember as much as possible. The goal is if you moved a rock in v1,
wrote some new code to blow rocks up, you could blow up the moved rock in v2.

self-signed ssl cert one-liners courtesy of https://stackoverflow.com/a/10176685:

```
openssl req -x509 -newkey rsa:4096 -keyout ssl/key.pem -out ssl/cert.pem -days 365 -nodes
```

The ssl is required because webVR stuff is usually only available over a "secure" context.


