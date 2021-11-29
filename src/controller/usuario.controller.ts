import { Request, Response } from "express";
import Usuario from "../models/usuario";

export const getUsuarios = async (req: Request, res: Response) => {
  const [amount, usuarios] = await Promise.all([
    await Usuario.count(),
    await Usuario.findAll(),
  ]);
  res.json({ amount, usuarios });
};

export const getUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    res.status(404).json({
      msg: `no existe el usuario con el id ${id}`,
    });
  }
  res.json(usuario);
};

export const postUsuario = async (req: Request, res: Response) => {
  const { nombre, email } = req.body;

  try {
    if (nombre == "" || email == "") {
      res.status(500).json({
        msg: "Hable con el administrador",
      });
    }
    const existeEmail = await Usuario.findOne({
      where: {
        email: email,
      },
    });

    if (existeEmail) {
      return res.status(400).json({
        msg: "Ya existe un usuario con el email " + email,
      });
    }

    const usuario = await Usuario.create({ nombre, email });
    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

export const putUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res
        .status(404)
        .json({ msg: "NO existe un usuario con el id" + id });
    }
    await usuario.update(body);
    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    return res.status(404).json({
      msg: "No existe un usuario con el id " + id,
    });
  }

  await usuario.update({ estado: false });

  // await usuario.destroy();

  res.json(usuario);
};
