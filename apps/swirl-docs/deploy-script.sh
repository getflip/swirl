# Print the current environment variables for debugging
echo "Current Environment Variables:"
printenv

# Check if DEPLOY_HOOK_TRIGGERED environment variable is set
echo "Checking if DEPLOY_HOOK_TRIGGERED is set..."
if [ -z "$DEPLOY_HOOK_TRIGGERED" ]; then
    echo "DEPLOY_HOOK_TRIGGERED is not set. Checking for changes in ./src..."
    # List current directory and check for changes
    ls
    git diff HEAD^ HEAD --quiet ./src
    # Capture the exit status of git diff
    GIT_DIFF_EXIT_STATUS=$?
    echo "Git diff exit status: $GIT_DIFF_EXIT_STATUS"
    # Exit with the git diff exit status
    exit $GIT_DIFF_EXIT_STATUS
else
    # Bypass ignore build step
    echo "Deploy hook triggered, proceeding with build"
    exit 1
fi
