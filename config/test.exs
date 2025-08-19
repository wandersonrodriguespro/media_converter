import Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :media_converter, MediaConverterWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "wjDVFUoFLpu0O6Qw25dYiycgpgas5h87lqBtPJ7Zdq9budeHg7CL3ucmdztL6AGO",
  server: false

# In test we don't send emails
config :media_converter, MediaConverter.Mailer, adapter: Swoosh.Adapters.Test

# Disable swoosh api client as it is only required for production adapters
config :swoosh, :api_client, false

# Print only warnings and errors during test
config :logger, level: :warning

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime
