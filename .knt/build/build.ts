import builder from 'electron-builder'

builder.build({
  targets: builder.Platform.WINDOWS.createTarget(['nsis'], builder.Arch.x64, builder.Arch.ia32),
  config: {

  },
})