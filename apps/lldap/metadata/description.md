# lldap - Light LDAP implementation for authentication

LDAP made easy.

## About

This project is a lightweight authentication server that provides an
opinionated, simplified LDAP interface for authentication. It integrates with
many backends, from KeyCloak to Authelia to Nextcloud and
[more](#compatible-services)!

<img
  src="https://raw.githubusercontent.com/lldap/lldap/master/screenshot.png"
  alt="Screenshot of the user list page"
  width="50%"
/>

It comes with a frontend that makes user management easy, and allows users to
edit their own details or reset their password by email.

The goal is _not_ to provide a full LDAP server; if you're interested in that,
check out OpenLDAP. This server is a user management system that is:

- simple to setup (no messing around with `slapd`),
- simple to manage (friendly web UI),
- low resources,
- opinionated with basic defaults so you don't have to understand the
  subtleties of LDAP.

It mostly targets self-hosting servers, with open-source components like
Nextcloud, Airsonic and so on that only support LDAP as a source of external
authentication.

For more features (OAuth/OpenID support, reverse proxy, ...) you can install
other components (KeyCloak, Authelia, ...) using this server as the source of
truth for users, via LDAP.

By default, the data is stored in SQLite, but you can swap the backend with
MySQL/MariaDB or PostgreSQL.

## Usage

The simplest way to use LLDAP is through the web front-end. There you can
create users, set passwords, add them to groups and so on. Users can also
connect to the web UI and change their information, or request a password reset
link (if you configured the SMTP client).

You can create and manage custom attributes through the Web UI, or through the
community-contributed CLI frontend (
[Zepmann/lldap-cli](https://github.com/Zepmann/lldap-cli)). This is necessary
for some service integrations.

The [bootstrap.sh](scripts/bootstrap.sh) script can enforce a list of
users/groups/attributes from a given file, reflecting it on the server.

To manage the user, group and membership lifecycle in an infrastructure-as-code
scenario you can use the unofficial [LLDAP terraform provider in the terraform registry](https://registry.terraform.io/providers/tasansga/lldap/latest).

LLDAP is also very scriptable, through its GraphQL API. See the
[Scripting](docs/scripting.md) docs for more info.

### Recommended architecture

If you are using containers, a sample architecture could look like this:

- A reverse proxy (e.g. nginx or Traefik)
- An authentication service (e.g. Authelia, Authentik or KeyCloak) connected to
  LLDAP to provide authentication for non-authenticated services, or to provide
  SSO with compatible ones.
- The LLDAP service, with the web port exposed to Traefik.
  - The LDAP port doesn't need to be exposed, since only the other containers
    will access it.
  - You can also set up LDAPS if you want to expose the LDAP port to the
    internet (not recommended) or for an extra layer of security in the
    inter-container communication (though it's very much optional).
  - The default LLDAP container starts up as root to fix up some files'
    permissions before downgrading the privilege to the given user. However,
    you can (should?) use the `*-rootless` version of the images to be able to
    start directly as that user, once you got the permissions right. Just don't
    forget to change from the `UID/GID` env vars to the `uid` docker-compose
    field.
- Any other service that needs to connect to LLDAP for authentication (e.g.
  NextCloud) can be added to a shared network with LLDAP. The finest
  granularity is a network for each pair of LLDAP-service, but there are often
  coarser granularities that make sense (e.g. a network for the \*arr stack and
  LLDAP).

## Client configuration

### Compatible services

Most services that can use LDAP as an authentication provider should work out
of the box. For new services, it's possible that they require a bit of tweaking
on LLDAP's side to make things work. In that case, just create an issue with
the relevant details (logs of the service, LLDAP logs with `verbose=true` in
the config).

### General configuration guide

To configure the services that will talk to LLDAP, here are the values:

- The LDAP user DN is from the configuration. By default,
  `cn=admin,ou=people,dc=example,dc=com`.
- The LDAP password is from the configuration (same as to log in to the web
  UI).
- The users are all located in `ou=people,` + the base DN, so by default user
  `bob` is at `cn=bob,ou=people,dc=example,dc=com`.
- Similarly, the groups are located in `ou=groups`, so the group `family`
  will be at `cn=family,ou=groups,dc=example,dc=com`.

Testing group membership through `memberOf` is supported, so you can have a
filter like: `(memberOf=cn=admins,ou=groups,dc=example,dc=com)`.

The administrator group for LLDAP is `lldap_admin`: anyone in this group has
admin rights in the Web UI. Most LDAP integrations should instead use a user in
the `lldap_strict_readonly` or `lldap_password_manager` group, to avoid granting full
administration access to many services. To prevent privilege escalation users in the
`lldap_password_manager` group are not allowed to change passwords of admins in the
`lldap_admin` group.

### Integration with OS's

Integration with Linux accounts is possible, through PAM and nslcd. See [PAM
configuration guide](example_configs/pam/README.md).

Integration with Windows (e.g. Samba) is WIP.

### Sample client configurations

Some specific clients have been tested to work and come with sample
configuration files, or guides. See the [`example_configs`](example_configs)
folder for help with:

- [Airsonic Advanced](example_configs/airsonic-advanced.md)
- [Apache Guacamole](example_configs/apacheguacamole.md)
- [Apereo CAS Server](example_configs/apereo_cas_server.md)
- [Authelia](example_configs/authelia_config.yml)
- [Authentik](example_configs/authentik.md)
- [Bookstack](example_configs/bookstack.env.example)
- [Calibre-Web](example_configs/calibre_web.md)
- [Carpal](example_configs/carpal.md)
- [Dell iDRAC](example_configs/dell_idrac.md)
- [Dex](example_configs/dex_config.yml)
- [Dokuwiki](example_configs/dokuwiki.md)
- [Dolibarr](example_configs/dolibarr.md)
- [Duo Auth Proxy](example_configs/duo_auth_proxy.md)
- [Ejabberd](example_configs/ejabberd.md)
- [Emby](example_configs/emby.md)
- [Ergo IRCd](example_configs/ergo.md)
- [Gitea](example_configs/gitea.md)
- [GitLab](example_configs/gitlab.md)
- [Grafana](example_configs/grafana_ldap_config.toml)
- [Grocy](example_configs/grocy.md)
- [Harbor](example_configs/harbor.md)
- [HashiCorp Vault](example_configs/hashicorp-vault.md)
- [Hedgedoc](example_configs/hedgedoc.md)
- [Home Assistant](example_configs/home-assistant.md)
- [Jellyfin](example_configs/jellyfin.md)
- [Jenkins](example_configs/jenkins.md)
- [Jitsi Meet](example_configs/jitsi_meet.conf)
- [Kasm](example_configs/kasm.md)
- [KeyCloak](example_configs/keycloak.md)
- [Kimai](example_configs/kimai.yaml)
- [LibreNMS](example_configs/librenms.md)
- [Maddy](example_configs/maddy.md)
- [Mailcow](example_configs/mailcow.md)
- [Mastodon](example_configs/mastodon.env.example)
- [Matrix](example_configs/matrix_synapse.yml)
- [Mealie](example_configs/mealie.md)
- [Metabase](example_configs/metabase.md)
- [MegaRAC-BMC](example_configs/MegaRAC-SP-X-BMC.md)
- [MinIO](example_configs/minio.md)
- [Netbox](example_configs/netbox.md)
- [Nextcloud](example_configs/nextcloud.md)
- [Nexus](example_configs/nexus.md)
- [OCIS (OwnCloud Infinite Scale)](example_configs/ocis.md)
- [OneDev](example_configs/onedev.md)
- [Organizr](example_configs/Organizr.md)
- [Peertube](example_configs/peertube.md)
- [Penpot](example_configs/penpot.md)
- [pgAdmin](example_configs/pgadmin.md)
- [Portainer](example_configs/portainer.md)
- [PowerDNS Admin](example_configs/powerdns_admin.md)
- [Prosody](example_configs/prosody.md)
- [Proxmox VE](example_configs/proxmox.md)
- [Quay](example_configs/quay.md)
- [Radicale](example_configs/radicale.md)
- [Rancher](example_configs/rancher.md)
- [Seafile](example_configs/seafile.md)
- [Shaarli](example_configs/shaarli.md)
- [Snipe-IT](example_configs/snipe-it.md)
- [SonarQube](example_configs/sonarqube.md)
- [Squid](example_configs/squid.md)
- [Stalwart](example_configs/stalwart.md)
- [Syncthing](example_configs/syncthing.md)
- [TheLounge](example_configs/thelounge.md)
- [Traccar](example_configs/traccar.xml)
- [UniFi OS](example_configs/udm_identity_end_point.md)
- [Vaultwarden](example_configs/vaultwarden.md)
- [WeKan](example_configs/wekan.md)
- [WG Portal](example_configs/wg_portal.env.example)
- [WikiJS](example_configs/wikijs.md)
- [XBackBone](example_configs/xbackbone_config.php)
- [Zendto](example_configs/zendto.md)
- [Zitadel](example_configs/zitadel.md)
- [Zulip](example_configs/zulip.md)

### Incompatible services

Though we try to be maximally compatible, not every feature is supported; LLDAP
is not a fully-featured LDAP server, intentionally so.

LDAP browsing tools are generally not supported, though they could be. If you
need to use one but it behaves weirdly, please file a bug.

Some services use features that are not implemented, or require specific
attributes. You can try to create those attributes (see custom attributes in
the [Usage](#usage) section).

Finally, some services require password hashes so they can validate themselves
the user's password without contacting LLDAP. This is not and will not be
supported, it's incompatible with our password hashing scheme (a zero-knowledge
proof). Furthermore, it's generally not recommended in terms of security, since
it duplicates the places from which a password hash could leak.

In that category, the most prominent is Synology. It is, to date, the only
service that seems definitely incompatible with LLDAP.

## Migrating from SQLite

If you started with an SQLite database and would like to migrate to
MySQL/MariaDB or PostgreSQL, check out the [DB
migration docs](/docs/database_migration.md).

## Comparisons with other services

### vs OpenLDAP

[OpenLDAP](https://www.openldap.org) is a monster of a service that implements
all of LDAP and all of its extensions, plus some of its own. That said, if you
need all that flexibility, it might be what you need! Note that installation
can be a bit painful (figuring out how to use `slapd`) and people have mixed
experiences following tutorials online. If you don't configure it properly, you
might end up storing passwords in clear, so a breach of your server would
reveal all the stored passwords!

OpenLDAP doesn't come with a UI: if you want a web interface, you'll have to
install one (not that many look nice) and configure it.

LLDAP is much simpler to setup, has a much smaller image (10x smaller, 20x if
you add PhpLdapAdmin), and comes packed with its own purpose-built web UI.
However, it's not as flexible as OpenLDAP.

### vs FreeIPA

[FreeIPA](http://www.freeipa.org) is the one-stop shop for identity management:
LDAP, Kerberos, NTP, DNS, Samba, you name it, it has it. In addition to user
management, it also does security policies, single sign-on, certificate
management, linux account management and so on.

If you need all of that, go for it! Keep in mind that a more complex system is
more complex to maintain, though.

LLDAP is much lighter to run (<10 MB RAM including the DB), easier to
configure (no messing around with DNS or security policies) and simpler to
use. It also comes conveniently packed in a docker container.

### vs Kanidm

[Kanidm](https://kanidm.com) is an up-and-coming Rust identity management
platform, covering all your bases: OAuth, Linux accounts, SSH keys, Radius,
WebAuthn. It comes with a (read-only) LDAPS server.

It's fairly easy to install and does much more; but their LDAP server is
read-only, and by having more moving parts it is inherently more complex. If
you don't need to modify the users through LDAP and you're planning on
installing something like [KeyCloak](https://www.keycloak.org) to provide
modern identity protocols, check out Kanidm.

## I can't log in!

If you just set up the server, can get to the login page but the password you
set isn't working, try the following:

- If you have changed the admin password in the config after the first run, it
  won't be used (unless you force its use with `force_ldap_user_pass_reset`).
  The config password is only for the initial admin creation.
- (For docker): Make sure that the `/data` folder is persistent, either to a
  docker volume or mounted from the host filesystem.
- Check if there is a `lldap_config.toml` file (either in `/data` for docker
  or in the current directory). If there isn't, copy
  `lldap_config.docker_template.toml` there, and fill in the various values
  (passwords, secrets, ...).
- Check if there is a `users.db` file (either in `/data` for docker or where
  you specified the DB URL, which defaults to the current directory). If
  there isn't, check that the user running the command (user with ID 10001
  for docker) has the rights to write to the `/data` folder. If in doubt, you
  can `chmod 777 /data` (or whatever the folder) to make it world-writeable.
- Make sure you restart the server.
- If it's still not working, join the
  [Discord server](https://discord.gg/h5PEdRMNyP) to ask for help.

## Discord Integration

[Use this bot](https://github.com/JaidenW/LLDAP-Discord) to Automate discord role syncronization for paid memberships.

- Allows users with the Subscriber role to self-serve create an LLDAP account based on their Discord username, using the `/register` command.
