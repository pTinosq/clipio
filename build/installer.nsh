!macro customInstall
    CreateDirectory "$APPDATA\clipio\modules" 
    CopyFiles "default_modules\modules\*.*" "$APPDATA\clipio\modules"
!macroend