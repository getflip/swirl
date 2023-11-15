# Check if DEPLOY_HOOK_TRIGGERED environment variable is set
if [ -z "$DEPLOY_HOOK_TRIGGERED" ]; then
    ls && git diff HEAD^ HEAD --quiet ./src
else
    # Bypass ignore build step
    echo "Deploy hook triggered, proceeding with build"
    exit 1
fi
