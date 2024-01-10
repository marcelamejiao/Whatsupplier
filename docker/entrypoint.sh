#!/usr/bin/env sh

# Exit on error
set -e

# Launch SupervisorD
exec supervisord -n -c /etc/supervisor/supervisord.conf
