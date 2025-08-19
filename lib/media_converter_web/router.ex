defmodule MediaConverterWeb.Router do
  use MediaConverterWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug CORSPlug
  end

  options "/api/convert", MediaConverterWeb.OptionsController, :options

  scope "/api", MediaConverterWeb do
    pipe_through :api
    post "/convert", ConversionController, :create
  end

  if Application.compile_env(:media_converter, :dev_routes) do
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through [:fetch_session, :protect_from_forgery]

      live_dashboard "/dashboard", metrics: MediaConverterWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end
