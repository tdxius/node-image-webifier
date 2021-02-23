app_name = node_image_webifier

to_container:
	echo -ne "\033]0;$(app_name)\007" && docker exec -it $(app_name) bash

run:
	echo -ne "\033]0;$(app_name)\007" && docker-compose up

run_and_build:
	echo -ne "\033]0;$(app_name)\007" && docker-compose up --build
