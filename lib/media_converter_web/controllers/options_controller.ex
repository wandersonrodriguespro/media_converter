defmodule MediaConverterWeb.OptionsController do
  use MediaConverterWeb, :controller

  def options(conn, _params) do
    conn
    |> put_resp_header("access-control-allow-origin", "http://localhost:5173")
    |> put_resp_header("access-control-allow-methods", "POST, OPTIONS")
    |> put_resp_header("access-control-allow-headers", "content-type")
    |> put_resp_header("access-control-max-age", "3600")
    |> send_resp(204, "")
  end
end
