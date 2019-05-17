<?php
// src/AppBundle/Controller/DefaultController.php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    /**
     * @Route("/")
     */
    public function indexAction()
    {
        $listeMusiques = $this->arrayFromCsvPath('../data/musiques.csv');
        $listeDiscours = $this->arrayFromCsvPath('../data/discours.csv');

        return $this->render('default/index.html.twig', [
            'listeMusiques' => $listeMusiques,
            'listeDiscours' => $listeDiscours,
            'musiqueId' => "jhiXkSKWbnU",
            'discoursId' => "o1sQAvB39N4"
        ]);
    }

    private function arrayFromCsvPath($path){
        $csvContent = file($path);
        $liste = array();
        foreach ($csvContent as $line_num => $row) {
            $csv = str_getcsv($row,';');
            $id = $csv[0];
            $liste[$id] = $csv;
        }
        return $liste;
    }
}
